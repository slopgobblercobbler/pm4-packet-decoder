#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetConfigRegDef {
    static constexpr std::uint8_t opcode = 0x68;
    static constexpr std::string_view name = "IT_SET_CONFIG_REG";
    static constexpr std::string_view desc = "Load consecutive configuration registers starting from offset";
};
}
