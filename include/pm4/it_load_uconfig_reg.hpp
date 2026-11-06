#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadUconfigRegDef {
    static constexpr std::uint8_t opcode = 0x6e;
    static constexpr std::string_view name = "IT_LOAD_UCONFIG_REG";
    static constexpr std::string_view desc = "Load user-config registers from GPU memory address";
};
}
