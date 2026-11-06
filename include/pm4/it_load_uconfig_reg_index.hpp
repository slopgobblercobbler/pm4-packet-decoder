#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItLoadUconfigRegIndexDef {
    static constexpr std::uint8_t opcode = 0x71;
    static constexpr std::string_view name = "IT_LOAD_UCONFIG_REG_INDEX";
    static constexpr std::string_view desc = "Load user-config registers with indexed offset addressing";
};
}
