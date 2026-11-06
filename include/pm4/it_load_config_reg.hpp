#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadConfigRegDef {
    static constexpr std::uint8_t opcode = 0x3b;
    static constexpr std::string_view name = "IT_LOAD_CONFIG_REG";
    static constexpr std::string_view desc = "Load configuration registers from GPU memory space";
};
}
